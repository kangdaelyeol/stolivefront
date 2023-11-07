import React from 'react';
import Styles from "./loadingSpinner.module.css"

export default function LoadingSpinner()  {
  return (
    <div className={Styles.loading__container}>
    <div className={`${Styles.loading__part1} ${Styles.common}`}> </div>
    <div className={`${Styles.loading__part2} ${Styles.common}`}> </div>
    <div className={`${Styles.loading__part3} ${Styles.common}`}> </div>
    <div className={`${Styles.loading__part4} ${Styles.common}`}> </div>
    <span>호리싯</span>
</div>
  );
}

