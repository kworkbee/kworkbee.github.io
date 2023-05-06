---
layout: doc
title: R2DBC ConnectionFactory
date: 2022-06-09
permalinkPattern: backend/spring/:year/:month/:day/:slug
---

```java
@Configuration
@EnableR2dbcRepositories
public class R2dbcConfiguration extends AbstractR2dbcConfiguration {

    @Bean
    public ConnectionFactoryInitializer initializer(ConnectionFactory connectionFactory) {
        ConnectionFactoryInitializer initializer = new ConnectionFactoryInitializer();
        initializer.setConnectionFactory(connectionFactory);

        CompositeDatabasePopulator populator = new CompositeDatabasePopulator();
        populator.addPopulators(
                new ResourceDatabasePopulator(new ClassPathResource("schema.sql")),
                new ResourceDatabasePopulator(new ClassPathResource("data.sql"))
        );
        initializer.setDatabasePopulator(populator);

        return initializer;
    }

    @Override
    @Bean
    public ConnectionFactory connectionFactory() {
        return ConnectionFactoryBuilder.withOptions(
            ConnectionFactoryOptions.builder()
                .option(ConnectionFactoryOptions.DRIVER, "postgresql")
                .option(ConnectionFactoryOptions.HOST, "localhost")
                .option(ConnectionFactoryOptions.PORT, 5432)
                .option(ConnectionFactoryOptions.USER, "spring")
                .option(ConnectionFactoryOptions.PASSWORD, "spring")
                .option(ConnectionFactoryOptions.DATABASE, "spring")
        ).build();
    }
}
```