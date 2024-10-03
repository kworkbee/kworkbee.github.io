# Boot 버전 업그레이드 후 시간 데이터 누락 이슈

Boot 3.2.7 이상으로 애플리케이션을 업그레이드한 후 문제가 발생했던 경험을 남깁니다.

Oracle DB를 사용하는 레거시 서버였는데, Boot 버전 업그레이드 후 만료일을 저장하는 DATE 타입 컬럼에 시간 데이터가 누락되어 저장되는 현상을 발견하게 되었습니다.

::: warning
아래 코드는 변형된 예제로, 실제 사용 중인 코드와는 차이가 있습니다.
:::

```java
...
import java.util.Date;

@Entity
public class Session {

  ...

  @Temporal(TemporalType.DATE)
  private Date expiration;

  ...
}
```

기존에는 아래와 같이 저장되었으나,

|    expiration    |
|-------------------|
|2024-01-01 12:35:00|

업그레이드 후 다음과 같이 저장이 되었습니다.

|expiration|
|----------|
|2024-01-01|

## 어떤 것이 문제일까?

[Boot 3.2.7 Release](https://github.com/spring-projects/spring-boot/releases/tag/v3.2.7)를 보면 다음과 같이 Dependency 변경이 발생합니다.

```txt
Upgrade to Hibernate 6.4.9.Final #41095
```

Hibernate 버전이 업그레이드 되었음을 알 수 있습니다. 해당 버전에 변경된 내용과 관련한 티켓을 다음과 같이 찾을 수 있었습니다.

- https://hibernate.atlassian.net/issues/HHH-18036
- https://hibernate.atlassian.net/issues/HHH-18065

이 티켓에 대한 구현이 Hibernate 6.4.9.Final 버전에 반영되었는데, 대표적으로 변경된 구현은 아래와 같습니다.

```java{32-35}
...
import java.util.Date;

@Override
public Date wrap(Object value, WrapperOptions options) {

  ...

  if ( value instanceof Date ) {
    return unwrapSqlDate( (Date) value );
  }

  ...

  throw unknownWrap( value.getClass() );
}

private java.sql.Date unwrapSqlDate(Date value) {
  if ( value instanceof java.sql.Date ) {
    final java.sql.Date sqlDate = (java.sql.Date) value;
    final long dateEpoch = toDateEpoch( sqlDate.getTime() );
    return dateEpoch == sqlDate.getTime() ? sqlDate : new java.sql.Date( dateEpoch );
  }
  return new java.sql.Date( unwrapDateEpoch( value ) );

}

// https://github.com/hibernate/hibernate-orm/pull/8276
private static long toDateEpoch(long value) {
  Calendar calendar = Calendar.getInstance();
  calendar.setTimeInMillis( value );
  calendar.set(Calendar.HOUR_OF_DAY, 0);
  calendar.clear(Calendar.MINUTE);
  calendar.clear(Calendar.SECOND);
  calendar.clear(Calendar.MILLISECOND);
  return calendar.getTimeInMillis();
}
```

`java.util.Date` 타입의 값을 `java.sql.Date` 타입의 값으로 변환하는 과정에서 시/분/초 그리고 밀리세컨드 데이터를 전부 Clear 시키는 구현이 추가되었다. 이러한 구현으로 인해 데이터가 저장될 때 해당 데이터가 저장되지 않은 것입니다.

## 어떻게 바꿀 수 있을까?

```java{2,9-10}
...
import java.time.Date;

@Entity
public class Session {

  ...

  @Temporal(TemporalType.Timestamp)
  private LocalDateTime expiration;

  ...
}
```

1. `TemporalType.Timestamp`로 교체

변환할 때의 구현을 [JdbcTimestampJavaType](https://github.com/hibernate/hibernate-orm/blob/main/hibernate-core/src/main/java/org/hibernate/type/descriptor/java/JdbcTimestampJavaType.java#L174-L176)에서 처리하는데, 이곳에서는 시간 관련 데이터를 제거하는 로직이 포함되어 있지 않습니다.

```java{10-12}
@Override
public <X> Date wrap(X value, WrapperOptions options) {
  if ( value == null ) {
    return null;
  }
  if ( value instanceof Timestamp ) {
    return (Timestamp) value;
  }

  if ( value instanceof Date ) {
    return new Timestamp( ( (Date) value ).getTime() );
  }

  if ( value instanceof LocalDateTime ) {
    return Timestamp.valueOf( (LocalDateTime) value );
  }

  if ( value instanceof Long ) {
    return new Timestamp( (Long) value );
  }

  if ( value instanceof Calendar ) {
    return new Timestamp( ( (Calendar) value ).getTimeInMillis() );
  }

  throw unknownWrap( value.getClass() );
}
```

2. `java.util` 패키지 대신 `java.time` 패키지 사용

JDK 8 이후 `java.util` 패키지가 Deprecated 되어 사용을 권장하지 않기도 하고, `JdbcDateJavaType`에서 `java.util.LocalDate` 타입에 대해서는 별도로 위의 `toDateEpoch` 메서드를 적용하지 않습니다. (애초에 일자 외 시간 데이터를 포함하지 않으니)