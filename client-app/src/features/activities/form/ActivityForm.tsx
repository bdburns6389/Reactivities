import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleSubmit = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    // Can add 'centered' as attribute to <Grid> to center everything on page.
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Title"
              value={activity.title}
              onChange={handleInputChange}
              name="title"
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              value={activity.description}
              onChange={handleInputChange}
              name="description"
            />
            <Form.Input
              placeholder="Category"
              value={activity.category}
              onChange={handleInputChange}
              name="category"
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
              onChange={handleInputChange}
              name="date"
            />
            <Form.Input
              placeholder="City"
              value={activity.city}
              onChange={handleInputChange}
              name="city"
            />
            <Form.Input
              placeholder="Venue"
              value={activity.venue}
              onChange={handleInputChange}
              name="venue"
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
              inverted
              color="green"
            />
            <Button
              floated="right"
              content="Cancel"
              onClick={() => history.push("/activities")}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
