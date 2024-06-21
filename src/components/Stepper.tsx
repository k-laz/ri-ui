import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  const progressWidth = ((currentStep + 1) * 100) / steps.length;
  return (
    <div className="h-2.5 w-full max-w-lg rounded-full  outline">
      <div
        className="h-2.5 rounded-full bg-blue-600"
        style={{ width: `${progressWidth}%` }}
      ></div>
    </div>
  );
};

export default Stepper;

//   return (
//     <div className="mx-auto mb-6 flex w-full max-w-lg items-center justify-between">
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           className={`flex-1 ${
//             index < steps.length - 1 ? 'flex' : ''
//           } items-center`}
//         >
//           <div
//             className={`flex h-10 w-10 items-center justify-center rounded-full ${
//               index <= currentStep
//                 ? 'bg-indigo-600 text-white'
//                 : 'bg-gray-300 text-gray-600'
//             }`}
//           >
//             {index + 1}
//           </div>
//           {index < steps.length - 1 && (
//             <div
//               className={`h-1 flex-1 ${
//                 index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
//               }`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
