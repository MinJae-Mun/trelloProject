import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import nunjucks from 'nunjucks';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { sessionMiddleware } from './middlewares/sessionMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

import { db } from './models/index.js';
import { AuthRouter } from './src/routers/auth.router.js';
// import { UsersRouter } from './src/routers/user.router.js';
import { BoardRouter } from './src/routers/board.router.js';
import { apiRouter } from './src/routers/index.js';

// 환경변수 세팅
dotenv.config();

// express
const app = express();
// ES6 모듈 __dirname 에러 방지
const __dirname = path.resolve();

// 서버 포트 세팉
app.set('port', process.env.PORT || 3000);

// 템플릿 세팅 미들웨어
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

// DB
const { sequelize } = db;
sequelize
    .sync({ force: false })
    // sync force true 쓰면 변경된 모델을 자동으로 db에 반영함
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((error) => {
        console.log('데이터베이스 연결 실패', error);
    });

app.use(morgan('dev'));

// 요청을 처리할 수 있게 변환해주는 미들웨어
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 쿠키 및 세션 처리 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use('/api', apiRouter);

// api 라우터
app.use('/api', [AuthRouter, BoardRouter]);

// app.use('/api', [CardRouter]);

// 에러 핸들링 미들웨어
app.use(errorMiddleware);

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 서버 실행');
});
