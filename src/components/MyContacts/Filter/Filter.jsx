import styles from './filter.module.css';

const Filter = ({ changeFilter }) => {
  return (
    <div>
      <label className={styles.filterLabel} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        id="filter"
        onChange={changeFilter}
        className={styles.inputFilter}
        name="filter"
        placeholder="Search"
      />
    </div>
  );
};

export default Filter;
