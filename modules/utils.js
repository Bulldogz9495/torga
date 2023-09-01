// Remove a sub object from a higher level object recursively
export function deleteSubobjectRecursively(obj, subobjectToDelete) {
    for (var prop in obj) {
        if (obj[prop] === subobjectToDelete) {
            delete obj[prop];
            return;
        }
        if (obj[prop] instanceof Object) {
            deleteSubobjectRecursively(obj[prop], subobjectToDelete);
        }
    }
}