import React, {useState} from 'react';
import styles from "./styles/index.scss";

const App = () => {

    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <h3>Hello React Webpack</h3>

            <h1>Count value: {count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Press me
            </button>
        </div>
    );
};

export default App;
