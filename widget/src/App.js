import classes from './App.module.scss';
import InitialLoc from "./Components/InitialLoc/InitialLoc";

const App = props => {

    return (
        <article className={classes.Widget}>
            <InitialLoc />
        </article>
    );
};

export default App;
