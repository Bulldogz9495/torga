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

export function zoomIn(element, scaleAmount) {
    let currentTransform
    currentTransform = currentTransform = window.getComputedStyle(element).transform;
    const currentScale =parseFloat(currentTransform.split('(')[1].split(')')[0]);
    const newScale = currentScale + scaleAmount;
    element.style.transform = `scale(${newScale})`;
  }