// module.exports = function setSchoolIntent() {
//   const { intent } = this.event.request;
//   if (intent.slots.school.confirmationStatus !== 'CONFIRMED') {
//     if (intent.slots.school.confirmationStatus !== 'DENIED') {
//       // Slot value is not confirmed
//       const slotToConfirm = 'school';
//       const speechOutput = `Your school is ${
//         intent.slots.school.value
//       }, is that correct?`;
//       const repromptSpeech = speechOutput;
//       this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
//     } else {
//       // Users denies the confirmation of slot value
//       const slotToElicit = 'school';
//       const speechOutput = 'Okay, what is the name of your school?';
//       this.emit(':elicitSlot', slotToElicit, speechOutput, speechOutput);
//     }
//   } else {
//     this.emit(':tell', 'School is set');
//   }
// };

module.exports = function setSchoolIntent() {
  console.log(this.event.request);
};
