import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

async function getInfo(id) {
   let info = fetch("");
}
function Info() {
   const { user_id } = useParams();
   useEffect(() => {}, [user_id]);
}
