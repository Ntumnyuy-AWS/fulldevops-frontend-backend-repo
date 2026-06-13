// src/components/dashboard/DashboardStyles.js
"use client";

import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const Status = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background: ${({ status }) =>
    status === "pending"
      ? "gray"
      : status === "accepted"
      ? "blue"
      : status === "in_transit"
      ? "orange"
      : "green"};
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background: black;
  color: white;
  cursor: pointer;
`;