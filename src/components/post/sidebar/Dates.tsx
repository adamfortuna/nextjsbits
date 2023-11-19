import { PostType } from "@/types";
import styles from '@/styles/modules/Sidebar.module.css'
import { daysBetweenDates } from "@/lib/wordpress/utils";

function SingleDate({date, title}:{date:Date, title: string}) {
  return (
    <div className={styles.date}>
      <span className={styles.dateTitle}>
        {title}
      </span>
      <span className={styles.dateSpacer}></span>
      <p className={styles.dateDate}>
        {date.toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </p>
    </div>
  )
}
export default function Dates({post}:{post:PostType}) {
  const { date, modifiedDate } = post
  const daysBetween = daysBetweenDates(date, modifiedDate)
  const showModified = daysBetween ? daysBetween > 30 : false

  return (
    <aside className={styles.info}>
      <h3 className={styles.infoHeader}>Dates</h3>
      <SingleDate date={date} title="Written" />
      {modifiedDate && showModified ? (
        <SingleDate date={modifiedDate} title="Updated" />
      ) : false}
    </aside>
  )
}