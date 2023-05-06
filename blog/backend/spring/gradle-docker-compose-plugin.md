---
layout: doc
title: Gradle Docker Compose Plugin
date: 2022-06-10
permalinkPattern: backend/spring/:year/:month/:day/:slug
---

Spring 프로젝트를 구성하다보면 `MySQL`과 같은 DB나, `Redis`와 같은 Cache를 함께 구성해야하는 경우가 있습니다. 별도로 서버를 세팅하는 과정이 번거로울 수 있고, 특히 테스트 작업의 경우 특정 데이터를 일시적으로 생성하고 삭제하게 되는 경우가 일반적인데 이를 개발자가 수동으로 일일이 조작하는 것이 비효율적인 작업이 될 수밖에 없습니다.

avast의 `docker-compose` 플러그인을 사용하면 `docker-compose.yml` 파일로 구성한 외부 의존성들을 컨테이너로 쉽게 Spring 프로젝트와 통합할 수 있고 별도의 docker 명령어 조작 없이도 task와 통합이 가능합니다.

`build.gradle`
```gradle
plugins {
  id "com.avast.gradle.docker-compose" version "0.16.4"
}
```

[Usage](https://github.com/avast/gradle-docker-compose-plugin#usage)

```gradle
dockerCompose {
  composeFile = "docker-compose.yml"

  isRequiredBy(project.tasks.test)
}
```