function getMarkersFromList(list, allLocationList){
    if(list.length === 0){
        return [];
    }
    // let arr1=[];
    // console.log(allLocationList);
    // for (let i=0;i<allLocationList.length;i++){
    //     if (allLocationList[i].products[0] ===list[0] || allLocationList[i].products[1]===list[0]){
    //         arr1.push(allLocationList[i])
    //     }
    //     console.log(i);
    //     // console.log(arr1);
    // }

    let filteredLocationList = allLocationList.filter((location) => list.includes(location["products"][0] || list.includes(location["products"][1])));
    // console.log(filteredLocationList);
    return filteredLocationList;
    // console.log(arr1);
    
    // return arr1
}

export default getMarkersFromList;