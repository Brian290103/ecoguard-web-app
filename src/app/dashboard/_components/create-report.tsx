"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateReport = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Report</CardTitle>
        <CardDescription>Submit a new environmental report</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" placeholder="Enter report title" />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the environmental issue..."
              rows={4}
            />
          </div>
          <Button className="w-full">Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateReport;
