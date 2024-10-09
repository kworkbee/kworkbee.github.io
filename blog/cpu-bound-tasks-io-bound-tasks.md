# CPU Bound와 I/O Bound

![CPU Bound / I/O Bound](https://www.baeldung.com/wp-content/uploads/sites/4/2023/09/CPU_IO_bursts.png)

> 출처 [Baeldung] https://www.baeldung.com

프로세스는 CPU Burst와 I/O Burst의 연속으로, 프로세스 시작은 CPU Burst로 시작해 I/O 작업을 만날 경우 I/O Burst가 진행되고, 진행이 완료되면 다시 CPU Burst를, 반복적으로 진행되다 프로세스가 종료되면 CPU Burst로 마무리된다.

> `Burst`란 어떤 현상이 짧은 시간 내 집중적으로 발생되는 것을 의미하는 것으로 CPU Burst는 프로세스는 CPU에서 한번에 연속적으로 실행되는 시간을, I/O Burst는 프로세스가 I/O 작업을 요청하고 결과를 기다리는 시간이다.

## CPU Bound

CPU Bound는 작업 혹은 프로그램 실행이 CPU에 크게 의존하는 시나리오를 가리킨다.

![CPU Bound](https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/cpu-bound.drawio.svg)

> 출처 [Baeldung] https://www.baeldung.com

- 대규모 수치 계산 등의 고속 연산
- 이미지 / 비디오 처리
- 암호화 작업

> ### CPU Burst Duration Histogram
>
> 대부분의 프로세스 CPU Burst는 일반적으로 8ms 내에 종료된다.
> 
> ![CPU Burst Duration Histogram](https://res.cloudinary.com/practicaldev/image/fetch/s--k9f5Z60q--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jv8l05kw12v8ck1urv3p.png)
> > 출처 dev.to
> 

## I/O Bound

I/O Bound는 작업 혹은 프로그램 실행이 입출력 시스템과 디스크, 주변 장치와 같은 리소스에 의존하는 시나리오를 가리킨다. 일반적으로 작업에 의한 병목 (다른 시스템과의 통신 과정에서 나타남) 에 의해 작업 속도가 결정된다.

![I/O Bound](https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/io-bound.drawio.svg)

> 출처 [Baeldung] https://www.baeldung.com

- File 읽기 / 쓰기
- 네트워크 통신
- 데이터베이스 쿼리 실행

---

## 작업 처리 성능

- CPU 개수가 추가되면 CPU Bound 작업 처리 성능이 향상되기 때문에 CPU Bound 작업이 주인 프로세스의 성능 향상에는 Scale Up이 주로 사용된다.
- I/O Bound의 경우 CPU 성능보다 타 시스템과의 병목 (I/O Waiting) 에 큰 영향을 받으므로 스레드 수를 늘리거나 동시성을 활용하게 되므로 I/O Bound 작업이 주인 프로세스의 성능 향상에는 Scale Out을 주로 사용한다.

---

## CPU Bound 프로그램과 Thread 수

소프트웨어 아키텍트인 Brian Goetz는 CPU Bound 프로그램에서 적절한 스레드 수로 (CPU 수 + 1)을 권장한다. 이는 Context Switching과 관련있는데, CPU Core에서 Thread를 동시에 작업할 수 없으므로 Thread를 번갈아가며 작업하는데 Context Switching이 발생되고 이를 Overhead를 최소화한다는 관점에서는 Thread 수를 CPU Core 수와 유사하게 설정하는 것이 좋다.

## I/O Bound 프로그램과 Thread 수

I/O Bound 프로그램의 경우 I/O Bound 작업이 자주 발생되므로 스레드 수를 동적으로 조절하거나 혹은 많은 스레드를 사용하는 것이 중요하다. 다만 지나치게 많을 경우 Context Switching Overhead가 증가하므로 적절한 균형을 맞추는 것이 중요하다. 다양한 변수를 고려해서 충분한 테스트 후 그 수를 결정해야 한다.