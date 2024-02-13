import styles from './filter.module.css';

const Filter = ({ onChangeFilter }) => {
  return (
    <div>
      <label className={styles.filterLabel} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        id="filter"
        onChange={onChangeFilter}
        className={styles.inputFilter}
        name="filter"
        placeholder="Search"
      />
    </div>
  );
};

export default Filter;
