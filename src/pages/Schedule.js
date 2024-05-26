import React from 'react';

import NewsLetter from '../elements/NewsLetter';
import PageTitle from '../elements/PageTitle';
import ScheduleTable from '../elements/ScheduleTable';

const Schedule = () => {
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Schedule" parentTitle="Pages" />    
                <div className="content-inner-1">
                    <div className="container">
                        <div className="schedule-table table-responsive">
                            <ScheduleTable />
                        </div>
                    </div>
                </div>
                
            </div>   
        </>
    );
};

export default Schedule;






// import React from "react";
// import ScheduleTable from '../elements/ScheduleTable';
// import PageTitle from "../elements/PageTitle";

// const Schedule = () => {
//    return (
//       <div className="h-80">
//          <PageTitle activeMenu="Calerdar" motherMenu="App" />

//          <ScheduleTable />
//       </div>
//    );
// };

// export default Schedule;
