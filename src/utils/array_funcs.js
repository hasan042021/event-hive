export function findRelatedObjects(array1, array2) {
  const relatedObjects = [];
  array2.forEach((obj) => {
    const id = String(obj.id);
    if (array1.includes(id)) {
      console.log(true);
      relatedObjects.push(obj);
    }
  });
  return relatedObjects;
}

export function findRSVP(data, eventId, userId) {
  return data.find(
    (rsvp) => rsvp.event.id == eventId && rsvp.attendee.id == userId
  );
}
