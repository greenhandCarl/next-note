import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import Image from 'next/image';
import styles from './index.module.css';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

type Props = {
  type: string,
  onChange(value: {
    accountPass: boolean,
    passwordPass: boolean,
    codePass: boolean,
    account: string,
    password: string
  }): void,
}

export type ImperativeHandle = {
  account: { value: string, pass: boolean },
  password: { value: string, pass: boolean },
  code: string,
  setLoginError(error: string): void,
  setCodeErrorStatus(status: boolean): void,
}

const rawCountDownNum = 60;

const originPasswordErrors = [
  { content: 'be at least 8 characters long', pass: false },
  { content: 'include both upper and lower case letters', pass: false },
  { content: 'include at least 1 number', pass: false },
];

const Form = (props: Props, ref: ForwardedRef<ImperativeHandle>) => {
  const searchParams = useSearchParams()
  const pageType = searchParams.get('pageType')
  const email = searchParams.get('email')
  const { type, onChange } = props;
  const [accountErrorStatus, setAccountErrorStatus] = useState<boolean>(false);
  const [passwordErrors, setPasswordErrors] = useState<{ content: string, pass: boolean }[]>([]);
  const [codeErrorStatus, setCodeErrorStatus] = useState<boolean>(false);
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [loginError, setLoginError] = useState<string>(''); // 'account or password error'
  const [hasSend, setHasSend] = useState<boolean>(false);
  const [countDownNum, setCountDownNum] = useState<number>(rawCountDownNum);
  const [countDowning, setCountDowning] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('United Kiongdom');
  const countDownTimer = useRef<number | null>(null);

  useEffect(() => {
    if (type === 'email' && typeof email === 'string' && email) {
      const value = decodeURIComponent(email);
      let newAccountErrorStatus = accountErrorStatus;
      if (pageType !== 'login') {
        const reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
        const res = reg.test(value);
        newAccountErrorStatus = !res;
      }
      setAccountErrorStatus(newAccountErrorStatus);
      setAccount(value);
      onChange({
        account: value,
        password: '',
        accountPass: !newAccountErrorStatus,
        passwordPass: (passwordErrors.length > 0 && passwordErrors.every(item => item.pass)) ||
        (password.length > 0 && passwordErrors.length === 0 ),
        codePass: code.length > 0,
      });

    }
  }, [type, email, accountErrorStatus, pageType, onChange, passwordErrors, password.length, code.length])

  const onAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let newAccountErrorStatus = accountErrorStatus;
    if (type === 'email' && pageType !== 'login') {
      const reg = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
      const res = reg.test(value);
      newAccountErrorStatus = !res;
    }
    setAccountErrorStatus(newAccountErrorStatus);
    setAccount(value);
    onChange({
      account: value,
      password,
      accountPass: !newAccountErrorStatus,
      passwordPass: (passwordErrors.length > 0 && passwordErrors.every(item => item.pass)) ||
      (password.length > 0 && passwordErrors.length === 0 ),
      codePass: code.length > 0,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const newPasswordErrors = originPasswordErrors.map((item, index) => {
      if (index === 0) return { ...item, pass: value.length > 7 };
      if (index === 1) return { ...item, pass: /(?=.*[a-z])(?=.*[A-Z])/.test(value) }
      if (index === 2) return { ...item, pass: /\d/.test(value) };
      return item;
    });
    const allPass = newPasswordErrors.every(item => item.pass) || pageType === 'login';
    setPasswordErrors(allPass ? [] : newPasswordErrors);
    onChange({
      account,
      password: value,
      accountPass: !accountErrorStatus,
      passwordPass: newPasswordErrors.length > 0 && allPass,
      codePass: code.length > 0,
    });
  };

  const onPasswordFocus = () => {
    const newPasswordErrors = originPasswordErrors.map((item, index) => {
      if (index === 0) return { ...item, pass: password.length > 8 };
      if (index === 1) return { ...item, pass: /(?=.*[a-z])(?=.*[A-Z])/.test(password) }
      if (index === 2) return { ...item, pass: /\d/.test(password) };
      return item;
    });
    const allPass = newPasswordErrors.every(item => item.pass) || pageType === 'login';
    setPasswordErrors(allPass ? [] : newPasswordErrors);
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    onChange({
      account,
      password,
      accountPass: !accountErrorStatus,
      passwordPass: (passwordErrors.length > 0 && passwordErrors.every(item => item.pass)) ||
      (password.length > 0 && passwordErrors.length === 0 ),
      codePass: value.length > 0,
    });
  };

  const iconRender = useCallback((visible: boolean) => {
    return visible
      ? <Image className={styles.close} src='/img/eye-open.svg' alt='open eye' width={40} height={40} />
      : <Image className={styles.open} src='/img/eye-close.svg' alt='close eye' width={40} height={40} />
  }, []);

  useImperativeHandle(ref, () => {
    const accountValue = account
    return {
      account: {
        value: accountValue,
        pass: !accountErrorStatus
      },
      password: {
        value: password,
        pass: (passwordErrors.length > 0 && passwordErrors.every(item => item.pass)) ||
        (password.length > 0 && passwordErrors.length === 0 ),
      },
      code,
      setCodeErrorStatus,
      setLoginError,
    }
  }, [account, password, accountErrorStatus, passwordErrors, code, selectValue, type])

  const onSendClick = async () => {
    if (account && !accountErrorStatus) {
      setHasSend(true);
      setCountDowning(true);
      startCountDown(countDownNum);
    } else {
      setAccountErrorStatus(true);
    }
  };

  const startCountDown = (total: number) => {
    if (countDownTimer && countDownTimer.current) {
      clearTimeout(countDownTimer.current);
      countDownTimer.current = null;
    }
    if (total > 0) {
      setCountDowning(true);
      countDownTimer.current = setTimeout(() => {
        setCountDownNum(total - 1);
        startCountDown(total - 1);
      }, 1000) as unknown as number;
    } else {
      setCountDowning(false);
      setCountDownNum(rawCountDownNum);
    }
  };

  const onSelect = (value: string) => {
    setSelectValue(value);
  };

  return <div className={styles.formWrapper}>
    <div className={styles.accountInputWrapper}>
      <Input
        className={clsx({
          [styles.accountInput]: true,
          [styles.error]: accountErrorStatus && account.length > 0
        })}
        placeholder={'Email'}
        allowClear
        onChange={onAccountChange}
        value={account}
      />
      {pageType !== 'login' && accountErrorStatus && account.length > 0 && <div className={styles.errorBox}>
        Please enter a valid email
      </div>}
    </div>
    <div className={styles.passwordInputWrapper}>
      <Input.Password
        className={clsx({
          [styles.passwordInput]: true,
          [styles.error]: passwordErrors.length > 0 && password.length !== 0
        })}
        placeholder="Password"
        iconRender={iconRender}
        onFocus={onPasswordFocus}
        value={password}
        onChange={onPasswordChange}
      />
      {pageType !== 'login' && passwordErrors.length > 0 && <ul className={clsx({
        [styles.errorBox]: true,
        [styles.original]: password.length === 0,
      })}>
        <li>
          {
            password.length === 0
              ? 'Your password must:'
              : 'Your password does not meet security requirements:'
          }
        </li>
        {passwordErrors.map((item, index) => <li
          key={index}
          className={clsx({
            [styles.errorItem]: true,
            [styles.checked]: item.pass
        })}>{item.content}</li>)}
      </ul>}
      {pageType === 'login' && loginError && <ul className={styles.errorBox}>
        <li>{loginError}</li>
      </ul>}
    </div>
    {pageType !== 'login' && 
    <div className={styles.codeWrapper}>
      <Input
        className={clsx({
          [styles.codeInput]: true,
          [styles.error]: codeErrorStatus
        })}
        placeholder="Verification code"
        onChange={onCodeChange}
        value={code}
      />
      {codeErrorStatus && <ul className={styles.errorBox}>
        Please enter a valid verification code
      </ul>}
      {countDowning && <div className={styles.countDown}>{countDownNum}S</div>}
      {!countDowning && <Button className={styles.sendCode} onClick={onSendClick}>{hasSend ? 'Send Again' : 'Send'}</Button>}
    </div>}
  </div>
};

export default forwardRef(Form);