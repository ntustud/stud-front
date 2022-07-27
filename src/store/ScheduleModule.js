import axios from 'axios'
const ax = axios.create({
    baseURL: 'http://176.100.13.234:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ScheduleModule = {
    state: () => ({
        faculties: [],
    }),

    getters: {

    },

    mutations: {
        setFaculties(state, data) {
            state.faculties = data;
        },
    },

    actions: {
        async getFaculties({ commit }, university_id) {
            try {
                const res = await ax.get(`/university/${university_id}/faculties`);

                commit('setFaculties', res.data.result);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getGroupsWhereFacultyAndCourse({ }, { faculty_id, num_course }) {
            try {
                const res = await ax.get(`/faculty/${faculty_id}/course/${num_course}/groups`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getLessonSchedulesForDayWhereGroup({ }, { semester_id, group_id, even, day_of_week }) {
            try {
                console.log(semester_id, group_id, even, day_of_week);
                const res = await ax.post(`/semester/${semester_id}/group/${group_id}/lesson/schedules/day`, { even, day_of_week });

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getCurrentSemester() {
            try {
                const res = await ax.get(`/semester/current`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getGroup({ }, group_id) {
            try {
                const res = await ax.get(`/group/${group_id}`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getLessonPlan({ }, lesson_plan_id) {
            try {
                const res = await ax.get(`/lesson/plan/${lesson_plan_id}`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getLecturer({ }, lecturer_id) {
            try {
                const res = await ax.get(`/lecturer/${lecturer_id}`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getCabinet({ }, cabinet_id) {
            const res = await ax.get(`/cabinet/${cabinet_id}`);

            return res;
        },

        async getSubject({ }, subject_id) {
            try {
                const res = await ax.get(`/subject/${subject_id}`);

                return res;
            } catch (error) {
                throw error;
            }
        },

        async getBuilding({ }, building_id) {
            try {
                const res = await ax.get(`/building/${building_id}`);

                return res;
            } catch (error) {
                throw error;
            }
        },
    },
    namespaced: true
}