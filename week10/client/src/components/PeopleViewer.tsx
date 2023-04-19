import {useQuery} from "@apollo/client";
import PersonCardGrid from "./PersonCardGrid";
import GET_PEOPLE from "../queries/GetPeople";

const PeopleViewer = () => {

    const {data, loading, error} =  useQuery(GET_PEOPLE);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="simplecards">
            <h2>All People</h2>
            <PersonCardGrid people={data.people} />
        </div>
    )
};

export default PeopleViewer;