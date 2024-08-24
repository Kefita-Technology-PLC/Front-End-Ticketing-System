import React, { useState, useEffect, useCallback } from "react";

import TopHeaders from "../headers/TopHeaders";
import Search from "./shared/Search";
import { Outlet } from "react-router-dom";
import { useBlur } from "../contexts/BlurContext";

const Vehicle = () => {
  const {isFormVisible, toggleFormVisibility} = useBlur()

  const navigation = [{
    id: 1,
    name: 'Vehicles',
    path: '',
    fakePath: 'show',
  },{
    id: 2,
    name: 'Add Vehicle',
    fakePath: 'add',
    path: 'add',
  },{
    id: 3,
    name: 'Delete/Update a Vehicle',
    fakePath: 'change',
    path: 'change',
  }]

  return (
    <div>
      <div className={`relative  `}>
        <TopHeaders topTitle={'Vehicles'} navigation={navigation} />
      </div>
      <Outlet />
    </div>

  );
};

export default Vehicle;
