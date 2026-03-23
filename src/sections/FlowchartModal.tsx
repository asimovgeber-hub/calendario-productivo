import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Network, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import type { Flowchart, FlowchartNode } from '@/types';

interface FlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  flowchart?: Flowchart;
  onSave: (flowchartId: string, nodes: any[], connections: any[]) => void;
  onCreate: (date: string) => string;
  onDelete: (id: string) => void;
  formatDate: (date: string) => { full: string; short: string; dayOfWeek: number; dayName: string };
}

export function FlowchartModal({
  isOpen,
  onClose,
  selectedDate,
  flowchart,
  onSave,
  onCreate,
  onDelete,
  formatDate
}: FlowchartModalProps) {
  const [nodes, setNodes] = useState<FlowchartNode[]>(flowchart?.nodes || []);
  const [connections, setConnections] = useState(flowchart?.connections || []);
  const [newNodeText, setNewNodeText] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const [currentFlowchartId, setCurrentFlowchartId] = useState(flowchart?.id);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (flowchart) {
      setNodes(flowchart.nodes);
      setConnections(flowchart.connections);
      setCurrentFlowchartId(flowchart.id);
    } else {
      setNodes([]);
      setConnections([]);
      setCurrentFlowchartId(undefined);
    }
  }, [flowchart]);

  const handleAddNode = () => {
    if (!newNodeText.trim()) return;

    let fcId = currentFlowchartId;
    if (!fcId && selectedDate) {
      fcId = onCreate(selectedDate);
      setCurrentFlowchartId(fcId);
    }

    const newNode: FlowchartNode = {
      id: Date.now().toString(),
      text: newNodeText,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50
    };

    setNodes(prev => [...prev, newNode]);
    setNewNodeText('');
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    if (connectMode && selectedNode && selectedNode !== nodeId) {
      // Crear conexión
      const exists = connections.some(c => c.from === selectedNode && c.to === nodeId);
      if (!exists) {
        setConnections(prev => [...prev, { from: selectedNode, to: nodeId }]);
      }
      setSelectedNode(null);
      setConnectMode(false);
    } else {
      setSelectedNode(nodeId);
    }
  };

  const handleStartConnect = () => {
    if (selectedNode) {
      setConnectMode(true);
    }
  };

  const handleDeleteConnection = (from: string, to: string) => {
    setConnections(prev => prev.filter(c => !(c.from === from && c.to === to)));
  };

  const handleSave = () => {
    if (currentFlowchartId) {
      onSave(currentFlowchartId, nodes, connections);
    }
    onClose();
  };

  const handleDeleteFlowchart = () => {
    if (currentFlowchartId && confirm('¿Eliminar este flujograma?')) {
      onDelete(currentFlowchartId);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-500" />
            Flujograma para {selectedDate ? formatDate(selectedDate).full : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Controles */}
          <div className="flex gap-2">
            <Input
              value={newNodeText}
              onChange={(e) => setNewNodeText(e.target.value)}
              placeholder="Texto del nodo"
              maxLength={30}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
            />
            <Button onClick={handleAddNode} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Nodo
            </Button>
            <Button 
              onClick={handleStartConnect} 
              disabled={!selectedNode}
              variant="outline"
              size="sm"
            >
              <LinkIcon className="w-4 h-4 mr-1" />
              Conectar
            </Button>
          </div>

          {/* Canvas */}
          <div 
            ref={canvasRef}
            className="border-2 border-gray-300 rounded-lg bg-gray-50 relative"
            style={{ width: '100%', height: '400px', position: 'relative' }}
          >
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            >
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                return (
                  <g key={idx}>
                    <line
                      x1={fromNode.x + 50}
                      y1={fromNode.y + 20}
                      x2={toNode.x + 50}
                      y2={toNode.y + 20}
                      stroke="#3B82F6"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
                </marker>
              </defs>
            </svg>

            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className={`absolute cursor-pointer px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedNode === node.id 
                    ? 'bg-blue-500 text-white shadow-lg scale-110' 
                    : 'bg-white text-gray-800 shadow hover:shadow-md'
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: '100px',
                  zIndex: selectedNode === node.id ? 10 : 1
                }}
              >
                <div className="flex justify-between items-start">
                  <span className="flex-1 truncate">{node.text}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Lista de conexiones */}
          {connections.length > 0 && (
            <div className="max-h-32 overflow-y-auto">
              <p className="text-sm font-medium text-gray-700 mb-2">Conexiones:</p>
              <div className="space-y-1">
                {connections.map((conn, idx) => {
                  const fromNode = nodes.find(n => n.id === conn.from);
                  const toNode = nodes.find(n => n.id === conn.to);
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs bg-gray-100 p-2 rounded">
                      <span>
                        {fromNode?.text} → {toNode?.text}
                      </span>
                      <button
                        onClick={() => handleDeleteConnection(conn.from, conn.to)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instrucciones */}
          <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
            <p className="font-medium mb-1">Instrucciones:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Escribe el texto y presiona "Nodo" para agregar un nuevo nodo</li>
              <li>Click en un nodo para seleccionarlo (se pone azul)</li>
              <li>Con un nodo seleccionado, presiona "Conectar" y luego click en otro nodo</li>
              <li>Click en la X roja para eliminar nodos o conexiones</li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 justify-end">
            {currentFlowchartId && (
              <Button
                variant="outline"
                onClick={handleDeleteFlowchart}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Flujograma
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
