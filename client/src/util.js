function getMarkersFromList(list, allLocationList){
    if(list.length === 0){
        return [];
    }
    // filters(array.filter) location where product list of the location contains(array.includes) at least one(array.some) name from the list of names checked 
    let filteredLocationList = allLocationList.filter((location) => list.some((e)=> location["products"].map((e)=>e.name).includes(e)));
    return filteredLocationList;
}

export default getMarkersFromList;