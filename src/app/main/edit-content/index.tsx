// import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import style from './index.module.css'
import { Button } from 'antd';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
// import { FolderOpenOutlined } from '@ant-design/icons';
// import EditableBriefText from '@/components/EditableBriefText';

const Content = () => {

    return <div className={style.homeContent}>
        <div className={style.title}>
            <div className={style.titleLeft}>
                {/* <EditableBriefText value="title" /> */}
                title
            </div>
            <div className={style.titleRight}>
                {/* <Button type='default' className={style.save}>正在保存...</Button> */}
                <Button type='default' className={style.save}>保存</Button>
                <Button type="primary">编辑</Button>
                <Button type="primary">预览</Button>
            </div>
        </div>
        <div className={style.content}>
          <div className={classNames({ [style.preview]: true, [style.showPreview]: true })}>
            <Markdown>111</Markdown>
          </div>
        </div>
    </div>
}

export default Content;