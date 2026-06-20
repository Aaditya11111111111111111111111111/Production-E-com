import { CreditCard, Smartphone, Truck } from "lucide-react";

const METHODS = [
  { id: "cod",  label: "Cash on Delivery", icon: <Truck size={20} />,       desc: "Pay when your order arrives" },
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={20} />, desc: "Visa, Mastercard, Amex (UI only)" },
  { id: "upi",  label: "UPI",              icon: <Smartphone size={20} />,  desc: "Google Pay, PhonePe, Paytm (UI only)" },
];

const PaymentMethod = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      {METHODS.map((m) => (
        <label
          key={m.id}
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
            selected === m.id
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={m.id}
            checked={selected === m.id}
            onChange={() => onChange(m.id)}
            className="accent-blue-600"
          />
          <span className={selected === m.id ? "text-blue-600" : "text-gray-500"}>
            {m.icon}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{m.label}</p>
            <p className="text-xs text-gray-400">{m.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default PaymentMethod;
