
import { apiSlice } from '../api/rtkApi';


export const educationApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createEducation : builder.mutation({
      query: (data) => ({
        url: '/education',
        method: 'POST',
        body: data,
      }), 
    }),
    createExperience : builder.mutation({
        query: (data) => ({
          url: '/experience',
          method: 'POST',
          body: data,
        }), 
      }),
      createCurrentMedication : builder.mutation({
        query: (data) => ({
          url: '/current-medication',
          method: 'POST',
          body: data,
        }), 
      }),
      createOperationHistory : builder.mutation({
        query: (data) => ({
          url: '/operation-history',
          method: 'POST',
          body: data,
        }), 
      }),
      createHealthStatus: builder.mutation({
        query: (data) => ({
          url: '/health-status',
          method: 'POST',
          body: data,
        }), 
      }),
      createAppointment: builder.mutation({
        query: (data) => ({
          url: '/appointments',
          method: 'POST',
          body: data,
        }), 
      }),
      updateApprovalStatus: builder.mutation({
        query: (id) => ({
          url: `/appointments/${id}/approve`,
          method: 'PATCH',
          body: {isApproved : true},
        }),
        invalidatesTags : ['appointments']
      }),
      getAllDoctor : builder.query({
        query: () => ({
          url: '/doctors',
          method: 'GET'
        }), 
      }),
      getAllPatient : builder.query({
        query: () => ({
          url: '/patient',
          method: 'GET'
        }), 
      }),
      getAllDoctorWithStatus : builder.query({
        query: () => ({
          url: '/doctors/with-status',
          method: 'GET'
        }), 
      }),
      createPrescription: builder.mutation({
        query: (formData) => ({
          url: '/prescription',
          method: 'POST',
          body: formData
        }),
        
      }),
  }),
});

export const {useCreateEducationMutation, useCreateHealthStatusMutation, useCreateExperienceMutation, useCreateCurrentMedicationMutation, useGetAllDoctorQuery, useCreateOperationHistoryMutation, useGetAllDoctorWithStatusQuery, useCreatePrescriptionMutation, useGetAllPatientQuery, useCreateAppointmentMutation, useUpdateApprovalStatusMutation} = educationApi;
