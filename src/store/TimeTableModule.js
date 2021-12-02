export const TimeTableModule = {
    state: () => ({
        selectedOption: '',
        headerText: 'Студ',
        fucultyOptions: [
          { value: 'FEIT', name: "ФЭИТ"},
          { value: 'FPU', name: "ФПУ"},
          { value: 'IPNY', name: "ИПНУ"},
          { value: 'NTCH', name: "НТЧ"},
        ],
        courseOptions: [
            { value: 'course1', name: "1"},
            { value: 'course2', name: "2"},
            { value: 'course3', name: "3"},
            { value: 'course4', name: "4"},
            { value: 'course5', name: "5"},
            { value: 'course6', name: "6"},
        ],
        groupOptions: [
            { value: 'KI-192', name: "KI-192"},
            { value: 'BiA-2-1', name: "БіА-2-1"},
            { value: 'PI-172', name: "ПІ-172"},
            { value: 'RA-211', name: "РА-211"},
        ]
    }),

    getters: {
      
    },

    mutations: {
        setHeaderText(state, headerText) {
            state.headerText = headerText;
        },

        // setPage(state, page) {
        //     state.page = page;
        // },
    },

    actions: {

    },
    namespaced: true
}