import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import eventsData from "../data/events.json";
import Countdown from "../components/Countdown";

export default function EventDetailsPage({ registeredEvents, setRegisteredEvents }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((e) => e.id === id);

  if (!event) return <div className="text-center mt-20 font-bold">Event not found!</div>;

  const isRegistered = registeredEvents.includes(id);

  const handleRegisterToggle = () => {
    if (isRegistered) {
      setRegisteredEvents(registeredEvents.filter(eventId => eventId !== id));
      toast.success("Registration cancelled.");
    } else {
      setRegisteredEvents([...registeredEvents, id]);
      toast.success("Successfully registered!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-indigo-600 font-bold">← Back</button>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        
        <div className="p-8">
          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-bold">{event.category}</span>
          <h1 className="text-3xl font-bold mt-4 mb-2 dark:text-white">{event.title}</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">{event.description}</p>
          
          <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-2xl mb-6 text-center">
             <h3 className="font-bold mb-4 dark:text-white">Event Starts In:</h3>
             <Countdown date={event.date} time={event.time} />
          </div>

          <button 
            onClick={handleRegisterToggle}
            className={`w-full p-4 rounded-xl font-bold text-white transition-colors ${isRegistered ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isRegistered ? "Cancel Registration" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}