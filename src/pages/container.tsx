import Timer from "../components/timer";
import ListNew from "../components/listNew";
import ListCompleted from "../components/listCompleted";

function Container() {
    return (
        <>
            <div className='page-content'>
                <Timer />
                <ListNew />
                <ListCompleted />
            </div>
        </>
    )
}

export default Container;