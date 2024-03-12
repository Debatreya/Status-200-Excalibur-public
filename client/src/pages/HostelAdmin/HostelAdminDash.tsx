import { useState } from "react";
import HostelAdminProfile from "./HostelAdminProfile"
import AnalyticsPage from "./RebateList";
import NotAssignedPage from "./NotAssignedPage";
import AssignedPage from "./AssignedPage";
import ReviewPage from "./ReviewPage";
import { useQuery } from "@tanstack/react-query";
import { getNotAssignedIssues } from "@/api/hostelAdminQueries";

interface ButtonProps {
    name: string;
    handleOnClick: () => void;
}
const Button = ({ name, handleOnClick }: ButtonProps) => {
    let bg;
    switch (name) {
        case "Analytics":
            bg = "bg-blue-500"
            break;
        case "Not Assigned":
            bg = "bg-red-500"
            break;
        case "Assigned":
            bg = "bg-green-500"
            break;
        case "Review":
            bg = "bg-yellow-500"
            break;
        default:
            bg = "bg-blue-500"
            break;
    }
    return (
        <button onClick={handleOnClick} className={` text-slate-900 p-2  my-2 w-[95%] font-bold rounded bg-[#00ADB5] text-lg  transition-all shadow-[0_0_2px_#00FFF5] hover:shadow-none`}>{name}</button>
    )
}
const HostelAdminDash = () => {
    const [selected, setSelected] = useState({
        'AnalyticsPage': true,
        'NotAssignedPage': false,
        'AssignedPage': false,
        'ReviewPage': false
    })
    const notAssignedIssueQuery = useQuery({
        queryKey: ['notAssignedIssues'],
        queryFn: getNotAssignedIssues,
        
    });
    
    if(notAssignedIssueQuery.isLoading){
        return (<h1>Fetching Not assigned issues</h1>)
    }
    const issues = notAssignedIssueQuery.data.issues;
    
    function handleReview(idx : number){
        const newIssues = [...issues];
        newIssues[idx].reviewed = true;
        // axios call to update the issue
        // setIssues(newIssues);
    }
    return (
        <div className="container flex items-center gap-4 justify-center min-w-[100svw] min-h-[100svh] bg-slate-600">
            <div className="profile flex flex-col items-center bg-[#222831] min-w-[23svw] min-h-[94svh] rounded-md p-4">
                    <HostelAdminProfile />
                    {<Button name="Analytics" handleOnClick={() => setSelected({ 'AnalyticsPage': true, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {<Button name="Not Assigned" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': true, 'AssignedPage': false, 'ReviewPage': false })} />}
                    {<Button name="Assigned" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': false, 'AssignedPage': true, 'ReviewPage': false })} />}
                    {<Button name="Review" handleOnClick={() => setSelected({ 'AnalyticsPage': false, 'NotAssignedPage': false, 'AssignedPage': false, 'ReviewPage': true })} />}
            </div>
            <div className="post_issue min-h-[94svh] min-w-[73svw] bg-[#222831] rounded-md flex justify-between items-center">
                {selected.AnalyticsPage && <AnalyticsPage />}
                {selected.NotAssignedPage && <NotAssignedPage issues={issues} />}
                {selected.AssignedPage && <AssignedPage issues={issues} />}
                {selected.ReviewPage && <ReviewPage issues={issues} handleReview={handleReview} />}
            </div>
        </div>
    )
}
export default HostelAdminDash