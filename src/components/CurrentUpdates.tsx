import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  Brain, 
  Heart,
  TrendingUp,
  Star
} from "lucide-react";

const CurrentUpdates = () => {
  const updates = [
    {
      title: "AI-Powered Diagnostics",
      description: "Enhanced diagnostic accuracy with our latest machine learning algorithms",
      icon: Brain,
      badge: "New Feature",
      badgeColor: "bg-green-100 text-green-800 border-green-200"
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights into patient flow and operational efficiency",
      icon: TrendingUp,
      badge: "Enhanced",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      title: "Mobile App Update",
      description: "Improved user experience with faster loading and better navigation",
      icon: Zap,
      badge: "Updated",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200"
    },
    {
      title: "Security Enhancement",
      description: "Advanced encryption and compliance with latest healthcare standards",
      icon: Shield,
      badge: "Security",
      badgeColor: "bg-lime-100 text-lime-800 border-lime-200"
    },
    {
      title: "Patient Portal",
      description: "New patient self-service features for appointment booking and records",
      icon: Users,
      badge: "New Portal",
      badgeColor: "bg-green-100 text-green-800 border-green-200"
    },
    {
      title: "Health Monitoring",
      description: "Integrated wearable device support for continuous health tracking",
      icon: Heart,
      badge: "Integration",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Current Updates
            </h2>
            <Star className="w-8 h-8 text-green-600 ml-3" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with our latest innovations and improvements in healthcare technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, index) => {
            const IconComponent = update.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-green-200 bg-white hover:bg-green-50/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${update.badgeColor} hover:scale-105 transition-transform duration-200`}>
                      {update.badge}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200">
                    {update.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {update.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">More updates coming soon!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentUpdates;
