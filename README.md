# template-ts-eslint
Template for TypeScript + ESLint

## How to use
- Caution
    - Write in `src` and compile to `dist`
- Command
    - `npm run clean` to erase compiled one
    - `npm run build` to compile new one
    - `npm run reset` to erase previous one and compile new one
- Config
    - Remove `dist` in `.gitignore` if you want to upload compiled one
    - Change `target`, `libs` in `dist.tsconfig.json/compilerOptions` as you want
    - Add `<lib-name>` to `dist.tsconfig.json/compilerOptions/types` after installing `@types/<lib-name>`


# Sparcs-Hackathon

## Goal
예쁘고 열심히 잘. - 디자인, 코드의 아름다움, 능력껏
새로운 것을 배우자.

- 실용적(사람들이 쓰긴 써야 되니까!)
- 개그?

## Concept
- 커서의 동기화
    - 서로의 커서가 보인다
	- 게임
		- 커서로 하는 술래잡기?
	- 낙서
		- otl 사이트 위에서 수강신청 어렵다고 한다던가...
- 구현 방법
    - 확장프로그램-기존의 스팍스 사이트 위에서 동작
    - 새로운 사이트

다이제

## TODO
우선 작성, 리팩토링.

- [ ] stack 정하기
    - [ ] socket.io 대체할 거?
    - [ ] express 대체할 거?

    - [ ] deno + fresh(server), nextjs(vanilla)
- [X] Get mouse position
- [X] server 돌리기
- [X] Send mouse position to server

- [ ] 가까워지면 두 cursor 주위에 빨간색 원이 생기게
- [ ] 술래라는 걸 만들어서 한 명만 색깔이 다르게
- [ ] 잡히면 술래라는 게 옮겨가서 색깔이 바뀌게
    - [ ] 잡혔을 때랑 처음에 들어올 때 3초 무적
    - [ ] map 동그라미 모양
- [ ] 아이템
    - [ ] 빨라지기
    - [ ] 느려지기
    - [ ] 아이템이 주기 생성
    - [ ] 장애물 피하기
- [ ] 결과 기록
    - [ ] 리더보드(랭킹)

- [ ] 배포
- [ ] user input 믿지 않기

```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]

https://intrepidgeeks.com/tutorial/animation-css-spark

mysql -h database-1.cjrntdyazsq9.ap-northeast-2.rds.amazonaws.com -P 3306 -u admin -p hackathon
```