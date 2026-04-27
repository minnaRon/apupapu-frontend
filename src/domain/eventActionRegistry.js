export const eventActionRegistry = {

  agree: () => ({
    status: 'sovittu',
  }),

  complete: ({ rating, review, role }) => {
    return { rating, review, role }
  },


  cancel: ({ reason }) => ({
    status: 'peruttu',
    addInfo: reason
  }),

  updateBasics: ({ beans, date, time, addInfo, otherUserId }) => ({
    beans,
    date,
    time,
    status: 'kesken',
    addInfo,
    otherUserId,
  }),
}
