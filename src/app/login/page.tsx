'use client';

import { Button, TabsProps, message } from 'antd';
import { createRef, useRef, useState } from 'react';
import styles from './index.module.css';
import DividerLine from './components/DividerLine';
import Form, { ImperativeHandle } from './components/Form';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const tabKeys = {
  phone: 'phone',
  email: 'email',
};

const labels = {
  registerPhone: 'Register with phone',
  registerEmail: 'Register with email',
  loginPhone: 'Log in with phone',
  loginEmail: 'Log in with email',
};

const titles = {
  login: 'Log in to your account',
  register: 'Register your account'
}

const pageTypes = {
  login: 'login',
  register: 'register'
}

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const pageType = searchParams.get('pageType')
  const [activeKey, setActiveKey] = useState<string>(tabKeys.email);
  const [registerDisabled, setRegisterDisabled] = useState<boolean>(true);
  const phoneFormRef = createRef<ImperativeHandle>();
  const emailFormRef = createRef<ImperativeHandle>();
  const loginRef = useRef<HTMLDivElement | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const onPhoneFormChange = (value: { accountPass: boolean, passwordPass: boolean, codePass: boolean }) => {
    const { accountPass, passwordPass, codePass } = value;
    if (pageType === pageTypes.register && activeKey === tabKeys.phone) {
      if (accountPass && passwordPass && codePass) {
        setRegisterDisabled(false);
      } else {
        setRegisterDisabled(true);
      }
    }
  };

  const onEmailFormChange = (value: { accountPass: boolean, passwordPass: boolean, codePass: boolean }) => {
    const { accountPass, passwordPass, codePass } = value;
    if (pageType === pageTypes.register && activeKey === tabKeys.email) {
      if (accountPass && passwordPass && codePass) {
        setRegisterDisabled(false);
      } else {
        setRegisterDisabled(true);
      }
    }
  };

  // const onRegister = async () => {
  //   let params: null | API.Register = null;
  //   if (activeKey === tabKeys.email && emailFormRef && emailFormRef.current && !registerDisabled) {
  //     const { account, password, code } = emailFormRef.current;
  //     params = {
  //       accountType: 1, // 1 - 邮箱； 2 - 手机号；
  //       account: account.value, // 邮箱或手机号
  //       password: password.value,
  //       verificationCode: code,
  //     }
  //   }
  //   if (activeKey === tabKeys.phone && phoneFormRef && phoneFormRef.current && !registerDisabled) {
  //     const { account, password, code } = phoneFormRef.current;
  //     params = {
  //       accountType: 2, // 1 - 邮箱； 2 - 手机号；
  //       account: account.value, // 邮箱或手机号
  //       password: password.value,
  //       verificationCode: code,
  //     }
  //   }
  //   if (params) {
  //     const res = await register(params);
  //     if (res.code !== 0) {
  //       messageApi.open({
  //         type: 'error',
  //         content: res.message,
  //         className: 'custom-class',
  //         style: {
  //           marginTop: '20vh',
  //         },
  //       });
  //     } else {
  //       // setToken(res.data?.token || '')
  //       messageApi.open({
  //         type: 'success',
  //         content: 'registered successfully',
  //         style: { marginTop: '20vh' },
  //         onClose: () => {
  //           if (res.data?.firstName) {
  //             router.push('/login?pageType=login');
  //           } else {
  //             router.push('/createName');
  //           }
  //         }
  //       });
  //     }
  //   }
  // };

  // const onLogin = async () => {
  //   let params: null | { account: string, password: string } = null
  //   if (activeKey === tabKeys.email && emailFormRef && emailFormRef.current) {
  //     const { account, password } = emailFormRef.current;
  //     params = {
  //       account: account.value, // 邮箱或手机号
  //       password: password.value,
  //     }
  //   }
  //   if (activeKey === tabKeys.phone && phoneFormRef && phoneFormRef.current) {
  //     const { account, password } = phoneFormRef.current;
  //     params = {
  //       account: account.value, // 邮箱或手机号
  //       password: password.value,
  //     }
  //   }
  //   if (params) {
  //     const res = await login(params);
  //     if (res.code !== 0) {
  //       messageApi.open({
  //         type: 'error',
  //         content: res.message,
  //         style: { marginTop: '20vh' },
  //       });
  //       return;
  //     }
  //     setToken(res.data?.token || '')
  //     messageApi.open({
  //       type: 'success',
  //       content: 'Log in successfully',
  //       style: { marginTop: '20vh' },
  //       duration: 0.5,
  //       onClose: () => {
  //         if (res.data?.firstName) {
  //           router.push('/userCenter');
  //         } else {
  //           router.push('/createName');
  //         }
  //       }
  //     });
  //   }
  // };

  const goRegistry = () => {
    router.push('/login?pageType=register')
  };

  const goLogin = () => {
    router.push('/login?pageType=login')
  };

  const goForgot = () => {
    router.push('/forgot');
  };

  const goIndex = () => {
    router.push('/');
  };

  if (!pageType) return null;

  return <div className={styles.registryWrapper}>
    <div className={styles.registryMain}>
      <div className={styles.insetWrapper}>
        <Image
          src='/img/register.png'
          width={515}
          height={724}
          alt='regiter'
          priority
          className={styles.reg}
        />
        <Image
          className={styles.logo}
          height={225}
          width={318}
          src='/img/logo.svg'
          alt='logo'
          priority
          onClick={goIndex}
        />
      </div>
      <div className={styles.registryBox}>
        <div className={styles.title}>{pageType === pageTypes.login ? titles.login : titles.register}</div>
        <div className={styles.googleWrapper}>
          <div
            id="g_id_onload"
            data-client_id="981303838430-lab7eebm94o1br3j4tc97gc5u0i2bhad.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback='handleGoogleLogin'
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="circle"
            data-theme="outline"
            data-text={pageType === pageTypes.login ? "signin_with" : 'signup_with'}
            data-size="large"
            data-logo_alignment="center"
            data-width="40"
            data-locale='en-US'
            ref={loginRef}
          ></div>
        </div>
        <DividerLine />
        <Form type='email' onChange={onEmailFormChange} ref={emailFormRef} />
        {pageType === pageTypes.login
          ? <>
            <div className={styles.forgot} onClick={goForgot}>Forgot your password?</div>
            <Button
              className={clsx({
                [styles.registerBtn]: true,
                [styles.active]: true,
              })}
              // onClick={onLogin}
            >
              Log in
            </Button>
            <div className={styles.logTips}>
              <span>Don&#39;t have an account? </span>
              <span className={styles.highlight} onClick={goRegistry}>Register</span>
            </div>
          </>
          : <>
            <Button
              className={clsx({
                [styles.registerBtn]: true,
                [styles.active]: !registerDisabled,
              })}
              style={{ marginTop: 20 }}
              disabled={registerDisabled}
              // onClick={onRegister}
            >
              Register
            </Button>
            <div className={styles.logTips}>
              <span>Already have account? </span>
              <span className={styles.highlight} onClick={goLogin}>Log in</span>
            </div>
          </> 
        }
      </div>
    </div>
    {contextHolder}
  </div>
};

export default Login;