import style from './index.less';

type LogoProps = {
  onClick?: () => void;
};

const Logo = (props: LogoProps) => {
  return (
    <div className={style.logo} onClick={props?.onClick}>
      <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuDWR7uXkbkAAAAAAAAAAAAADmJ7AQ/original" />
    </div>
  );
};

export default Logo;
