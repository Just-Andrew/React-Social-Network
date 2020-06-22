import React from 'react';
import styles from "./PersonInfo.module.css";
import icon from '../../../../assets/Pictures/gps_icon.png';

const PersonInfo = () => {
    
    let avatar = 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5de7ba698d5b5f00b251d2e7_5de8721cfe289100b0b4a9f5/scale_1200'
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
            </div>
            <div className={styles.aboutPerson}>
                <div className={styles.avatar}>

                    <img src={avatar}
                        alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.username}><b> JustHuman </b></div>

                    <div className={styles.birthDate}>01.05.2004</div>

                    <div className={styles.location}>
                        <img src={icon} />
                    Moscow, Russia
                    </div>
                </div>
            </div>
        </div>
    );

}



export default PersonInfo;