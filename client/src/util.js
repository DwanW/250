function getMarkersFromList(list, allLocationList){
    if(list.length === 0){
        return [];
    }
    let filteredLocationList = allLocationList.filter((location) => list.some((e)=> location["products"].map((e)=>e.name).includes(e)));
    return filteredLocationList;
}

export default getMarkersFromList;