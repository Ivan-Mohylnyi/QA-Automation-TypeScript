import { After, Before } from '@cucumber/cucumber';
import { AutomationExerciseWorld } from '../worlds/automation-exercise.world';

export function pageHook(): void {
    Before(async function (this: AutomationExerciseWorld, { pickle }) {
        const featureName = pickle.uri.replace('.feature', '').replace(/[/\\]/g, '-');
        const scenarioName = pickle.name.replace(/[/\\]/g, '-');
        const path = `videos/${featureName}/${scenarioName}`;

        this.browserContext = await AutomationExerciseWorld.browser.newContext({
            viewport: { width: 1600, height: 900 },
            recordVideo: { dir: path }
        });

        this.page = await this.browserContext.newPage();
    });

    After(async function (this: AutomationExerciseWorld) {
        await this.browserContext.close();
    });
}
