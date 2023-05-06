---
title: StatefulSet + Headless로 배포한 Eureka Server 개별 Pod에 도메인 연결하기
date: 2022-11-25
permalinkPattern: devops/:year/:month/:day/:slug
---

# StatefulSet + Headless로 배포한 Eureka Server 개별 Pod에 도메인 연결하기

## Overview

MSA 컴포넌트 중 하나인 Service Discovery - Spring Cloud Eureka Server의 고가용성(High Availability)을 위해서 Peering을 구성하고, 이를 쿠버네티스 환경에서 배포하려면 어떻게 해야할까?
개별 서버 인스턴스는 고유한 정보(클라이언트 인스턴스 정보 - 물론 Peering을 통해서 개별 인스턴스는 동일한 목록의 Replica를 가지겠지만, 복제가 완료되기 전까지는 각 서버 인스턴스별로 보유하는 클라이언트 인스턴스 정보가 상이하다.)를 가지고 있고, 서로에 대해 (개별 Pod 간에) 식별이 가능해야 한다. 이러한 특징은 일반적으로 마이크로서비스 인스턴스가 Stateless한 것과는 대비된다.

쿠버네티스에서는 `StatefulSet`이라고 하는 Workload API 오브젝트를 제공하여 이와 같은 요구사항을 충족시켜준다. `Deployment` 오브젝트와 유사하게 동일한 컨테이너 스펙을 기반으로 둔 Pod를 관리하면서, 각 Pod의 독자성을 유지할 수 있다. 이에 더해, 고유한 네트워크 식별자를 가지게 되면서 서로 간에 인식하고 통신할 수 있기도 하다. Headless Service 오브젝트를 사용해 논리적으로 동일 서비스로 묶어 이를 구현할 수 있다.

## Declaration

```yaml

```

## Headless Service?

Headless Service는 `ClusterIP: None`인 Service 오브젝트를 일컫는다. StatefulSet으로 배포하는 애플리케이션은 개별 Pod들이 고유한 특성이 있어 동일 IP로 접근할 때 매번 다른 상태의 Pod로 연결되는 결과를 일으키기 때문에 로드밸런싱 자체가 무의미하다. 따라서 Stateful한 애플리케이션에는 적합하지 않기 때문에 별도의 `ClusterIP`를 부여받을 필요성이 없다.
대신, Headless Service를 생성하게 되면 클러스터 네트워크 내부에서 서비스에 속한 Pod에 접근 가능한 고유한 DNS가 생성되어 이를 통해 서로를 인식할 수 있다.
다음과 같이 `[statefulSetName]-[ordinal].[serviceName].[namespace].svc.cluster.local`과 같은 양식을 가진다.

## 개별 Pod에 도메인을 연결하려면?

일반적으로 Ingress / LB에 service를 지정해 도메인을 연결하는 반면, 개별 Pod에 도메인을 연결하기 위해서 어떤 방법을 사용해야 하는 것일까?
StatefulSet으로 배포하게 되면, StatefulSet 컨트롤러가 Pod를 생성하는 과정에서 `statefulset.kubernetes.io/pod-name` 이라는 label을 각 Pod에 부여시켜준다. 이 label을 사용해서 Headless Service와는 별개의 개별 Pod에 대한 NodePort Type의 Service 오브젝트를 생성하고, Ingress 오브젝트의 Rules를 통해 해당 서비스를 연결하는 방식으로 개별 Pod와 도메인을 연결시켜줄 수 있다.

AWS EKS 환경에서 배포하고, AWS의 ALB를 Ingress로 사용하는 경우 다음과 같은 정보를 추가하면 AWS ALB Controller가 spec에 정의한대로 ALB를 생성해줄 것이다. CNAME 레코드를 추가해 도메인을 연결하면 해당 도메인으로 접속할 때 개별 Pod로 접근이 가능할 것이다.