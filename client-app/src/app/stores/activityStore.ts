import { observable, action, makeObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: 'always' })

class ActivityStore {

    constructor() {
        makeObservable(this);
    }
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | null = null;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values());
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activites = await agent.Activites.list();
            runInAction(() => {
                activites.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })

        }
    }

    @action loadActivityById = async (id: string) => {
        try {
            let activity = this.getActivities(id);
            if (activity) {
                this.selectedActivity = activity;
            }
            else {
                this.loadingInitial = true;
                activity = await agent.Activites.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                    this.loadingInitial = false;
                })
            }
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }

    }

    getActivities = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action clearActivity = () => {
        this.selectedActivity = null;
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activites.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })

        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activites.update(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })


        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })

        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = null;
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = null;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activites.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })

        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            })
        }
    }
}

export default createContext(new ActivityStore())