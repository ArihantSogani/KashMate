                              // src/components/CategoryChart.jsx
                              import React, { useEffect, useState } from 'react';
                              import api from '../config/axios';
                              import {
                                BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
                              } from 'recharts';
                              
                              const CategoryChart = ({ token }) => {
                                const [data, setData] = useState([]);
                              
                                useEffect(() => {
                                  const fetchSummary = async () => {
                                    try {
                                      const res = await api.get('/api/expenses/summary/category');
                                      // Format for Recharts: [{ category: "Food", totalAmount: 200 }, ...]
                                      const formatted = res.data.map(item => ({
                                        category: item._id,
                                        totalAmount: item.totalAmount
                                      }));
                                      setData(formatted);
                                    } catch (err) {
                                      console.error('Failed to fetch summary:', err);
                                    }
                                  };
                              
                                  fetchSummary();
                                }, [token]);
                              
                                return (
                                  <div className="w-full h-96 p-4 bg-white rounded-lg shadow-md">
                                    <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
                                    <ResponsiveContainer width="100%" height="100%">
                                      <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="totalAmount" fill="#8884d8" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                );
                              };
                              
                              export default CategoryChart;
                              