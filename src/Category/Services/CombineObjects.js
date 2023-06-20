const combineObjects = (obj1, obj2) =>
{
    let obj = []
    obj1.forEach((ob) => obj.push(ob))
    obj2.forEach((ob) => obj.push(ob))
    return obj
}

module.exports = { combineObjects }