/* eslint-disable react/prop-types */
import { useState } from "react"
import styles from "./styles/HomeComponent.module.css"
import { useTranslation } from 'react-i18next';

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const { t } = useTranslation(); // Get the translation function

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem);
    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.newTodoForm}>
      <div className={styles.formRow}>
        <label htmlFor="item">
          <h1 className={styles.todoTitle}>{t('addNewTodoTitle')}</h1> {/* Translate the title */}
        </label>
        <input
          className={styles.todoInput}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder={t('newTodoPlaceholder')}
        />
      </div>

      <button className={styles.addTodoBtn}>{t('addTodoButton')}</button> {/* Translate the button text */}
    </form>
  );
}