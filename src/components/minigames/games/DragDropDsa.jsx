import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const DragDropDsa = ({ gameState, onUpdate, onComplete }) => {
  const handleDragStart = (e, nodeId) => {
    e.dataTransfer.setData('text/plain', nodeId);
  };

  const handleDrop = (e, dropZoneId) => {
    e.preventDefault();
    const nodeId = parseInt(e.dataTransfer.getData('text/plain'));
    onUpdate({ dropZoneId, nodeId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (!gameState) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Build a Linked List</h3>
        <p className="text-gray-600">Drag the nodes to their correct positions</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Available Nodes:</h4>
        <div className="flex flex-wrap gap-3">
          {gameState.nodes.filter(node => !node.placed).map(node => (
            <div
              key={node.id}
              draggable
              onDragStart={(e) => handleDragStart(e, node.id)}
              className="drag-drop-item bg-white p-3 rounded-lg border-2 border-indigo-300 cursor-grab"
            >
              {node.value}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium text-gray-900 mb-3">Linked List Structure:</h4>
        <div className="flex items-center space-x-2">
          {gameState.dropZones.map((zone, index) => (
            <React.Fragment key={zone.id}>
              <div
                className="drop-zone w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-sm"
                onDrop={(e) => handleDrop(e, zone.id)}
                onDragOver={handleDragOver}
              >
                {zone.filled ? (
                  <div className="bg-indigo-100 p-2 rounded text-indigo-800">
                    {gameState.nodes.find(n => n.id === zone.nodeId)?.value}
                  </div>
                ) : 'Drop here'}
              </div>
              {index < gameState.dropZones.length - 1 && <div className="text-gray-400">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      {gameState.completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 p-4 rounded-lg text-center"
        >
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h4 className="font-semibold text-green-800">Linked List Complete!</h4>
          <p className="text-green-600">You've successfully built the data structure!</p>
        </motion.div>
      )}
    </div>
  );
};

export default DragDropDsa;