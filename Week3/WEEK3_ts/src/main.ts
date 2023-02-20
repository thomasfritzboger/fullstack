import './style.css'

import { getPeople } from "./people";
import { renderPeopleList } from "./peopleList";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  
     <div id="container">
     </div>
`;

(async()=> {
    try {
        const container = document.querySelector<HTMLDivElement>('#container');
        const people = await getPeople()
        if (container) {
            await renderPeopleList(people,container)
        }
        else {
            console.log('Could not find container')
        }
    }
    catch (error:unknown) {
        console.log(error);
    }
} )()