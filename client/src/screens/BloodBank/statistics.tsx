import * as React from "react";
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Container, SelectChangeEvent } from "@mui/material";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptGetAllBloodBanks, attemptGetDonors } from "../../redux/slices/authSlice";
import LoginInput from "../../types/inputs/user/LoginInput";
import { useSelector } from "react-redux";
import { PieChart, blueberryTwilightPaletteLight } from "@mui/x-charts";
import { Console } from "console";




export default function Statistics(props: any) {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [listOfDonors, setListOfDonors] = useState<any[]>([]);
    const [listOfBloodBanks, setListOfBloodBanks] = useState<any[]>([]);
    const countByBloodbank : number[]= [];
    const [filters, setFilters] = useState<LoginInput>({
        name: '',
        email: '',
        password: '',
        bloodType: '',
        transfusionInstitute: '',
        numberOfDonations: '100',
        gender: '',
        age: 0,
        id: 0,
    });

    useEffect(() => {
        dispatch(attemptGetDonors(filters))
            .then((response: any) => {
                setListOfDonors(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch, filters]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const bloodBanksResponse = await dispatch(attemptGetAllBloodBanks());
                    setListOfBloodBanks(bloodBanksResponse.payload || []);
                    let updatedFilters: LoginInput = { ...filters };
                    if (user.name != "Crveni Križ") {
                            updatedFilters["transfusionInstitute"] = user.name;
                        setFilters(updatedFilters);
                    }
                    dispatch(attemptGetDonors(updatedFilters))
                        .then((response: any) => {
                            setListOfDonors(response.payload || []);
                        })
                        .catch((error: any) => {
                            console.error(error)
                        });
                }
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();
    }, [dispatch, user, role]);

    const instituteNames = [
      "KBC Osijek",
      "KBC Rijeka",
      "KBC Split",
      "OB Dubrovnik",
      "OB Varaždin",
      "OB Zadar",
      "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    ];
    

  
    const bloodTypeCounts: Record<string, number> = listOfDonors.reduce(
        (acc, donor) => {
            const { bloodType } = donor;
            acc[bloodType] = (acc[bloodType] || 0) + 1;
            return acc;
        },
        {}
    );
    const genderCounts: Record<string, number>  =listOfDonors.reduce(
      (acc, donor)=>{
        const {gender} = donor;
        acc[gender]= (acc[gender] || 0)+1;
        return acc;
      },{}
    )
    const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    const gender= ['M', 'F'];
    const yAxisData1 = bloodTypes.map((type) => bloodTypeCounts[type] || 0);
    const value1= gender.map((gender)=>genderCounts[gender] || 0);
    
    return (
        <Container >
        <Box display={"flex"} padding={"100px"}>
          <Box style={{
            padding: '10px',
            marginBottom: '10px',
            color: '#b2102f',
          }}> <Typography variant="h5"
          align="center"
          color="text.secondary"
          component="p"> 
          Graf broja donora po tipu krvi
          </Typography>
        <BarChart 
  xAxis={[
    {
      id: 'barCategories',
      data : bloodTypes,
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: yAxisData1
    },
  ]}
  width={500}
  height={300}
  colors={blueberryTwilightPaletteLight}
/>
</Box>
<Box style={{
            padding: '10px',
            marginBottom: '10px',
            color: '#b2102f',
          }}> <Typography variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          margin ={"10px"}> 
          Omjer spola
          </Typography>
<PieChart
  series={[
    {
      data: [
        { id: 0, value: value1[0], label: 'Male' },
        { id: 1, value: value1[1], label: 'Female' },
      ],
    },
  ]}
  width={500}
  height={250}
/>
</Box>
</Box>
</Container>
    );
}