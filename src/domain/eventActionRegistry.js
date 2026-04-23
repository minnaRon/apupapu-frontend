export const eventActionRegistry = {

  agree: () => ({
    status: 'sovittu',
  }),

  complete: ({ userId, completedBy }) => {
    const exists = completedBy?.some(p => p.user === userId)

    const updated = exists
      ? completedBy
      : [...(completedBy || []), { user: userId }]

    return {
      completedBy: updated,
      status: updated.length === 2 ? 'valmis' : 'sovittu'
    }
  },

  cancel: ({ reason }) => ({
    status: 'peruttu',
    addInfo: reason
  }),

  updateBasics: ({ beans, date, time }) => ({
    beans,
    date,
    time,
    status: 'kesken',
    completedBy: []
  }),

  review: ({ rating, review }) => ({
    rating,
    review
  })
}
