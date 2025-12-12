import style from './file-list.module.css'
import { FileMarkdownFilled } from '@ant-design/icons';
import classNames from 'classnames';

const FileList= () => {

  return <>
    <ul className={style.list}>
      {/* <li className={style.empty}>
        <img className={style.emptyIcon} src={require('/static/menus/empty_note.png')} alt="empty" />
        <div className={style.emptyText}>没有找到文件</div>
        <div className={style.newBtn} onClick={onNewClick}>新建笔记</div>
      </li> */}
      <li className={classNames(style.item)}>
        <div className={style.title}>
            <FileMarkdownFilled className={style.fileIcon} />
            <span className={style.titleText}>Three.js</span>
        </div>
        <div className={style.date}>2025.04.03</div>
      </li>
      <li className={classNames(style.item)}>
        <div className={style.title}>
            <FileMarkdownFilled className={style.fileIcon} />
            <span className={style.titleText}>Three.js</span>
        </div>
        <div className={style.date}>2025.04.03</div>
      </li>
    </ul>
  </>
}



export default FileList;