import { useState, useEffect } from 'react';
import type { Flowchart, FlowchartNode, FlowchartConnection } from '@/types';

export function useFlowcharts() {
  const [flowcharts, setFlowcharts] = useState<Flowchart[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('calendar_flowcharts');
    if (stored) {
      setFlowcharts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar_flowcharts', JSON.stringify(flowcharts));
  }, [flowcharts]);

  const createFlowchart = (date: string) => {
    const newFlowchart: Flowchart = {
      id: Date.now().toString(),
      date,
      nodes: [],
      connections: [],
      createdAt: new Date().toISOString()
    };
    setFlowcharts(prev => [...prev, newFlowchart]);
    return newFlowchart.id;
  };

  const updateFlowchart = (id: string, nodes: FlowchartNode[], connections: FlowchartConnection[]) => {
    setFlowcharts(prev => prev.map(fc => 
      fc.id === id ? { ...fc, nodes, connections } : fc
    ));
  };

  const deleteFlowchart = (id: string) => {
    setFlowcharts(prev => prev.filter(fc => fc.id !== id));
  };

  const getFlowchartForDate = (date: string) => {
    return flowcharts.find(fc => fc.date === date);
  };

  const addNode = (flowchartId: string, text: string, x: number, y: number) => {
    const newNode: FlowchartNode = {
      id: Date.now().toString(),
      text,
      x,
      y
    };
    
    setFlowcharts(prev => prev.map(fc => 
      fc.id === flowchartId 
        ? { ...fc, nodes: [...fc.nodes, newNode] }
        : fc
    ));
  };

  const updateNode = (flowchartId: string, nodeId: string, updates: Partial<FlowchartNode>) => {
    setFlowcharts(prev => prev.map(fc => 
      fc.id === flowchartId
        ? {
            ...fc,
            nodes: fc.nodes.map(node =>
              node.id === nodeId ? { ...node, ...updates } : node
            )
          }
        : fc
    ));
  };

  const deleteNode = (flowchartId: string, nodeId: string) => {
    setFlowcharts(prev => prev.map(fc => 
      fc.id === flowchartId
        ? {
            ...fc,
            nodes: fc.nodes.filter(node => node.id !== nodeId),
            connections: fc.connections.filter(conn => 
              conn.from !== nodeId && conn.to !== nodeId
            )
          }
        : fc
    ));
  };

  const addConnection = (flowchartId: string, from: string, to: string) => {
    const newConnection: FlowchartConnection = { from, to };
    
    setFlowcharts(prev => prev.map(fc => 
      fc.id === flowchartId
        ? { ...fc, connections: [...fc.connections, newConnection] }
        : fc
    ));
  };

  const deleteConnection = (flowchartId: string, from: string, to: string) => {
    setFlowcharts(prev => prev.map(fc => 
      fc.id === flowchartId
        ? {
            ...fc,
            connections: fc.connections.filter(conn =>
              !(conn.from === from && conn.to === to)
            )
          }
        : fc
    ));
  };

  return {
    flowcharts,
    createFlowchart,
    updateFlowchart,
    deleteFlowchart,
    getFlowchartForDate,
    addNode,
    updateNode,
    deleteNode,
    addConnection,
    deleteConnection
  };
}
